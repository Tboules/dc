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
    <circle cx={61.5} cy={61.5} r={58.5} stroke="#fff" strokeWidth={6} />
    <path
      stroke="#fff"
      strokeWidth={4}
      d="M119 71.568c-4.403 15.38-20.06 16.918-28.378 11.792-4.505-2.777-11.88-7.208-21.038-10.198-7.75-2.53-16.777-4.029-26.42-2.619C22.123 73.62 5 82.847 5 82.847"
    />
    <path
      stroke="#fff"
      strokeWidth={4}
      d="M78 76c18.828-10.198 29.459-9.86 42-3.4M26 109c21.985-2.077 42.399-14.822 64-9.863"
    />
    <path
      stroke="#fff"
      strokeWidth={4}
      d="M12 96.906c35.664-18.228 54.981 0 74.794 1.953C106.607 100.812 116.527 81.804 118 81"
    />
    <path stroke="#fff" strokeWidth={6} d="M63 70V19M43 33h42" />
  </svg>
);
export default DesertCollectionsLogo;
