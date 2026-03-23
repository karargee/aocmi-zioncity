import PhotoLightbox from "@/components/PhotoLightbox";

const allImages = [
  ...Array.from({ length: 12 }, (_, i) => `/img/church-${i + 1}.jpg`),
  "/img/photo_2026-02-14_20-08-03.jpg",
  "/img/photo_2026-02-14_20-08-04.jpg",
  "/img/photo_2026-02-19_21-01-51.jpg",
  "/img/photo_2026-02-19_21-01-52.jpg",
  "/img/photo_2026-02-19_21-01-53.jpg",
  "/img/photo_2026-02-26_21-36-17.jpg",
  "/img/photo_2026-03-01_18-05-20.jpg",
  "/img/photo_2026-03-02_21-27-12.jpg",
  "/img/photo_2026-03-16_21-51-09.jpg",
  "/img/photo_2026-03-16_21-53-52.jpg",
  "/img/photo_2026-03-16_21-54-09.jpg",
  "/img/photo_2026-03-16_21-54-37.jpg",
  "/img/photo_2026-03-16_21-54-46.jpg",
  "/img/photo_2026-03-16_21-54-50.jpg",
  "/img/photo_2026-03-16_21-55-24.jpg",
  "/img/photo_2026-03-16_21-55-31.jpg",
  "/img/photo_2026-03-19_19-15-04.jpg",
  "/img/photo_2026-03-19_19-15-07.jpg",
  "/img/photo_2026-03-19_21-41-28.jpg",
  "/img/photo_2026-03-19_21-41-29.jpg",
  "/img/photo_2026-03-19_21-41-30.jpg",
];

export default function GalleryPage() {
  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Pictorial Moments</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Live at AOCMI-ZIONCITY</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <PhotoLightbox images={allImages} />
      </div>
    </>
  );
}
