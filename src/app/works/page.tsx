import CircularGallery from "@/components/CircularGallery";

export const metadata = {
  title: "Our Works | ANDCUT Studios",
  description: "Explore our latest projects and behind the scenes.",
};

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <CircularGallery />
    </main>
  );
}
