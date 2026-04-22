import { FaCheckCircle, FaCircle, FaRegCircle } from "react-icons/fa";

type GreenCheckmarkProps = {
  /** When false, show an unpublished (muted) icon. Defaults true for module/lesson rows. */
  published?: boolean;
};

export default function GreenCheckmark({
  published = true,
}: GreenCheckmarkProps) {
  if (!published) {
    return (
      <span
        className="me-1 d-inline-flex align-items-center"
        title="Not published"
      >
        <FaRegCircle className="text-secondary fs-5" aria-hidden />
      </span>
    );
  }
  return (
    <span className="me-1 position-relative" title="Published">
      <FaCheckCircle
        style={{ top: "2px" }}
        className="text-success me-1 position-absolute fs-5"
        aria-hidden
      />
      <FaCircle className="text-white me-1 fs-6" aria-hidden />
    </span>
  );
}
