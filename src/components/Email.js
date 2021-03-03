import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import Aos from "aos"
import "aos/dist/aos.css"
import { Context } from "../Context"
import MailSvg from "../assets/svgs/mail.svg"

const Email = () => {
  const { isToggled } = useContext(Context)

  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <ContactContainer id="contact" isToggled={isToggled}>
      <LeftColumn>
        <MailLogo isToggled={isToggled} />
      </LeftColumn>
      <RightColumn>
        <TitleContainer>
          <Title>Get In Touch</Title>
        </TitleContainer>
        <ContactForm
          name="contactForm"
          method="POST"
          action="https://www.georgewillens.com/"
        >
          <input type="hidden" name="form-name" value="contactForm" />
          <NameInput placeholder="Name" name="name" id="name"></NameInput>

          <EmailInput
            type="email"
            placeholder="Email"
            name="email"
            id="email"
          ></EmailInput>

          <MessageInput
            placeholder="Message"
            name="message"
            id="message"
            rows="8"
          ></MessageInput>
          <div
            class="g-recaptcha"
            data-sitekey={process.env.SITE_RECAPTCHA_KEY}
          ></div>
          <Button type="submit" value="SEND ➤"></Button>
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
  width: calc(100% - 70px);
  height: 450px;
  background-color: ${({ isToggled }) =>
    isToggled ? "var(--dark-grey)" : "var(--light-grey)"};
  margin: -35px 35px 0 35px;
  padding: 35px calc((100vw - 1300px) / 2);
  transition: 0.4s;
  color: ${({ isToggled }) =>
    isToggled ? "var(--very-light-grey)" : "var(--very-dark-grey)"};
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
  color: var(--main-pink);
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
  font-size: 15px;
  font-weight: 600;
  border-radius: 17px;
  border: 0;
  background-color: var(--grey);
`

const EmailInput = styled.input`
  width: 100%;
  height: 10%;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 17px;
  border: 0;
  background-color: var(--grey);
`

const MessageInput = styled.textarea`
  width: 100%;
  margin-bottom: 1rem;
  padding: 10px 0 0 15px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 17px;
  border: 0;
  background-color: var(--grey);
`

const Button = styled.input`
  width: 98px;
  height: 40px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  border: 0;
  background-color: var(--main-pink);
  color: white;
  cursor: pointer;
`
