import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"
import Aos from "aos"
import "aos/dist/aos.css"
import { Context } from "../Context"
import MailSvg from "../assets/svgs/mail.svg"
import SendSvg from "../assets/svgs/sendIcon.svg"

const Email = () => {
  const { darkMode } = useContext(Context)

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [messageSent, setMessageSent] = useState(false)

  useEffect(() => {
    Aos.init({})
  }, [])

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": event.target.getAttribute("name"),
        ...formState,
      }),
    })
      .then(() => setFormState({ name: "", email: "", message: "" }))
      .then(() => setMessageSent(true))
      .then(() =>
        setTimeout(() => {
          setMessageSent(false)
        }, 3000)
      )
      .catch(error => alert(error))
  }

  return (
    <ContactContainer id="contact" darkMode={darkMode}>
      <LeftColumn
        data-aos="fade-right"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <MailLogo />
      </LeftColumn>
      <RightColumn
        data-aos="fade-left"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <TitleContainer>
          <Title>Get In Touch</Title>
        </TitleContainer>
        <ContactForm
          name="contactForm"
          method="POST"
          onSubmit={handleSubmit}
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contactForm" />
          <input type="hidden" name="bot-field" />

          <NameInput
            placeholder="Name"
            name="name"
            id="name"
            onChange={handleChange}
            value={formState.name}
            required
          ></NameInput>

          <EmailInput
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formState.email}
            required
          ></EmailInput>

          <MessageInput
            placeholder="Message"
            name="message"
            id="message"
            rows="8"
            onChange={handleChange}
            value={formState.message}
            required
          ></MessageInput>

          <ButtonContainer>
            {messageSent ? (
              <Button type="submit" messageSent={messageSent}>
                THANKS FOR YOUR MESSAGE!
              </Button>
            ) : (
              <Button type="submit" messageSent={messageSent}>
                SEND
                <SendIcon />
              </Button>
            )}
          </ButtonContainer>
        </ContactForm>
      </RightColumn>
    </ContactContainer>
  )
}

export default Email

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--dark-grey)" : "var(--light-grey)"};
  margin: 0 35px;
  padding: 35px calc((100vw - 1200px) / 2);
  transition: 0.4s;
  color: ${({ darkMode }) =>
    darkMode ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
  overflow-x: hidden;
`

const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  max-width: 400px;
  padding-left: 35px;
  padding-bottom: 30px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const MailLogo = styled(MailSvg)`
  width: 100%;
  max-width: 280px;
  color: var(--main-colour);
`

const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  padding: 20px 35px 0 35px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 350px;
  max-width: 600px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-left: 0.5rem;
`

const NameInput = styled.input`
  width: 100%;
  height: 10%;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: 0;
  background-color: var(--grey);
`

const EmailInput = styled.input`
  width: 100%;
  height: 10%;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: 0;
  background-color: var(--grey);
`

const MessageInput = styled.textarea`
  width: 100%;
  margin-bottom: 1rem;
  padding: 10px 0 0 15px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: 0;
  background-color: var(--grey);
`

const ButtonContainer = styled.div`
  min-width: 98px;
  height: 40px;
  position: relative;
`

const Button = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  border: 0;
  background-color: var(--main-colour);
  color: white;
  cursor: pointer;
  transition: 0.4s;

  padding: ${({ messageSent }) =>
    messageSent ? "0px 15px 0px 15px" : "0 26px 0 0"};

  & :hover {
    background-color: var(--icon-colour);
  }
`

const SendIcon = styled(SendSvg)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  fill: var(--very-light-grey);
`
