"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

type ScooterRideProps = {
  className?: string;
  animate?: boolean;
};

export default function ScooterRide({ className, animate = true }: ScooterRideProps) {
  const scooterRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const scooter = scooterRef.current;
      if (!scooter) return;
      if (!animate) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const path = document.getElementById("scooter-path") as SVGPathElement | null;
      const svg = document.getElementById("scooter-path-svg") as SVGSVGElement | null;
      if (!path || !svg) return;

      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 770px)", () => {
        let tween: gsap.core.Tween | null = null;

        const setPath = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;

          svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

          const start = vw * 0.85;
          const right = vw * 0.9;
          const left = vw * 0.1;
          const mid = vw * 0.5;
          const y0 = vh * 0.2;
          const y1 = vh * 0.4;
          const y2 = vh * 0.65;
          const y3 = vh * 0.9;

          const d = [
            `M ${start} ${y0}`,
            `L ${mid} ${y0}`,
            `L ${mid} ${y1}`,
            `L ${left} ${y1}`,
            `L ${left} ${y2}`,
            `L ${mid} ${y2}`,
            `L ${mid} ${y3}`,
            `L ${right} ${y3}`,
          ].join(" ");

          path.setAttribute("d", d);
        };

        const createAnimation = () => {
          gsap.set(scooter, {
            transformOrigin: "50% 50%",
            scaleY: -1,
            scaleX: -1,
            willChange: "transform",
            force3D: true,
          });

          tween = gsap.to(scooter, {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              onUpdate: (self) => {
                const currentRotation = gsap.getProperty(scooter, "rotation") as number;
                const flipX = self.direction === -1;

                gsap.set(scooter, { scaleX: flipX ? 1 : -1, scaleY: currentRotation == 0 ? 1 : -1 });
              },
            },
          });
        };

        setPath();
        createAnimation();

        const onResize = () => {
          // Kill existing animation
          if (tween) {
            tween.scrollTrigger?.kill();
            tween.kill();
          }

          // Update path
          setPath();

          // Recreate animation with new path
          createAnimation();

          // Refresh ScrollTrigger
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          if (tween) {
            tween.scrollTrigger?.kill();
            tween.kill();
          }
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div className={`scooter-ride ${className ?? ""}`.trim()} ref={containerRef} aria-hidden>
      <div className="scooter-ride__sprite" ref={scooterRef}>
        <div className="scooter-ride__smoke" aria-hidden />
        <Image
          src="/scooter.png"
          alt=""
          width={84}
          height={84}
          className="scooter-ride__img scooter-ride__img--light"
          priority
          draggable={false}
        />
        <Image
          src="/scooter-dark.png"
          alt=""
          width={84}
          height={84}
          className="scooter-ride__img scooter-ride__img--dark"
          priority
          draggable={false}
        />
      </div>
    </div>
  );
}
