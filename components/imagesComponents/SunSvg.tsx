export default function SunSvg({ className, darkMode }) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.5 19.75C16.9518 19.75 19.75 16.9518 19.75 13.5C19.75 10.0482 16.9518 7.25 13.5 7.25C10.0482 7.25 7.25 10.0482 7.25 13.5C7.25 16.9518 10.0482 19.75 13.5 19.75Z"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
      />
      <path
        d="M13.5 1V3.5"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M13.5 23.5V26"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M3.5 13.5H1"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M26 13.5H23.5"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M23.2226 3.77832L20.4451 6.3178"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M3.77783 3.77832L6.55534 6.3178"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M6.55562 20.4453L3.77783 23.2231"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M23.2226 23.2211L20.4451 20.4434"
        stroke={darkMode ? "#fcbd90" : "#ece3e0"}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
