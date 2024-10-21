import "./notFound.scss";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-page__container">
        <p className="error-page__message">404</p>
        <p className="error-page__text">Sorry, something went wrong!</p>
      </div>
    </div>
  );
}
