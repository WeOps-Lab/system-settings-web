"use client";

import React from "react";
import introductionInfoStly from "./index.module.less";
interface IntroductionInfoProp {
  message: string;
  title: string;
}
const IntroductionInfo: React.FC<IntroductionInfoProp> = ({ message, title }) => (
  <div className={`h-16 w-full rounded-md ${introductionInfoStly.introductionInfo}`}>
    <h1 className="text-xl ml-5 pt-2">{title}</h1>
    <p className="ml-5">{message}</p>
  </div>
);

export default IntroductionInfo;
