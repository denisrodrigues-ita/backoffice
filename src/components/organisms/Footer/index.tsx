import React from "react";
import {
  AiOutlineWhatsApp,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { DdevSVG } from "@/assets";
import Link from "next/link";
import "./Footer.css";

const Footer: React.FC = () => {
  const date = new Date();
  return (
    <footer className="my-8">
      <div className="w-max mx-auto sm:ml-0">
        <Link href="/">
          <DdevSVG
            style={{ width: "10rem", height: "4rem" }}
            className="fill-blue-light-50 dark:fill-white-light mx-auto sm:mx-0"
          />
        </Link>
      </div>
      <div className="text-center sm:text-start">
        <div className="flex mt-4 justify-center sm:justify-start">
          <Link href="https://wa.me/5535984484087" target="_blank">
            <AiOutlineWhatsApp className="link" />
          </Link>
          <Link
            href="https://www.instagram.com/denisrodrigues.ita/"
            target="_blank"
          >
            <AiOutlineInstagram className="link" />
          </Link>
          <Link href="mailto:denisrodrigues.ita@gmail.com">
            <AiOutlineMail className="link" />
          </Link>
        </div>
        <p className="footerText">
          Entre em contato e faça um orçamento para o seu site.
        </p>
        <p className="footerText">
          © {date.getFullYear()} Ddev. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
