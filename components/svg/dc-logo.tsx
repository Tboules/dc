import * as React from "react";
import { SVGProps } from "react";

const DesertCollectionsLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={123}
    height={123}
    viewBox="0 0 123 123"
    fill="none"
    {...props}
  >
    <circle cx={61.5} cy={61.5} r={60.5} stroke="#fff" strokeWidth={2} />
    <path
      stroke="#fff"
      strokeWidth={2}
      d="M120.5 71.53c-4.5 15-20.5 16.5-29 11.5C86.896 80.322 79.359 76 70 73.084c-7.92-2.468-17.145-3.93-27-2.554-21.5 3-39 12-39 12"
    />
    <path
      stroke="#fff"
      strokeWidth={2}
      d="M77.5 75.5c19.5-9 30.511-8.702 43.5-3M24 109c22.672-2.077 43.724-14.822 66-9.863"
    />
    <path
      stroke="#fff"
      strokeWidth={2}
      d="M12 96.864c36-18.18 55.5 0 75.5 1.948S117.513 81.802 119 81"
    />
    <path stroke="#fff" strokeWidth={3} d="M61.5 71V20M41 34.5h42" />
  </svg>
);
export default DesertCollectionsLogo;
