export const DREAMGLOBAL_ADDRESS =
  "BT ARCADE, Bus Stand, Hill Rd, near PRIVATE, PERUMPRAYIL, Periyar Nagar, Aluva, Kerala 683101";

const DREAMGLOBAL_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15711.560393494448!2d76.34072507140984!3d10.108081274544604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x81105dc8b24ce16d%3A0x7d87ab00dd3c6554!2sDreamGlobal!5e0!3m2!1sen!2sin!4v1775750841789!5m2!1sen!2sin";

type LocationMapProps = {
  className?: string;
  title?: string;
};

const LocationMap = ({
  className = "",
  title = "DreamGlobal Location",
}: LocationMapProps) => (
  <div
    className={`overflow-hidden rounded-2xl border border-[color:var(--career-border)] bg-white shadow-[var(--career-shadow-soft)] ${className}`}
  >
    <iframe
      title={title}
      src={DREAMGLOBAL_MAP_SRC}
      className="h-[320px] w-full md:h-[380px]"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default LocationMap;
