import Link from "next/link";
import { Search, ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <p className="bg-gradient-to-br from-primary via-purple-500 to-cyan-400 bg-clip-text text-[7rem] font-black leading-none text-transparent sm:text-[9rem]">
          404
        </p>
        <span className="absolute -right-3 top-2 flex h-10 w-10 animate-spin items-center justify-center rounded-full bg-primary/10 text-primary [animation-duration:6s]">
          <Compass className="h-5 w-5" />
        </span>
      </div>

      <h1 className="text-2xl font-semibold sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist, was moved, or is no longer available.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">
            <Search className="mr-2 h-4 w-4" />
            Get Help
          </Link>
        </Button>
      </div>
    </div>
  );
}
