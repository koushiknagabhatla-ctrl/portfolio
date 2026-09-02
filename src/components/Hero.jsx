import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

import heroImg from '../assets/hero.webp';

gsap.registerPlugin(ScrollTrigger);

const CONTENT = {
  network: {
    titleLines: ["I'M", 'NETWORK ENGINEER'],
    watermark: '通信網',
    profileLabel: '[Profile]',
    profile: 'B.Tech Computer Science student designing, configuring, and troubleshooting enterprise-grade networks. Hands-on across multi-switch and multi-router topologies — VLANs, 802.1Q trunking, inter-VLAN routing, OSPF, Rapid PVST+, EtherChannel, ACLs, and Layer-2 security on Cisco IOS. Strong in VLSM subnetting, packet-level analysis, and systematic fault isolation.',
    stackLabel: '[Core Stack]',
    stack: 'Cisco IOS, VLANs, 802.1Q, OSPF, STP/RPVST+, EtherChannel, ACLs, Port Security, DHCP Snooping, Dynamic ARP Inspection, BPDU Guard, NAT/PAT, Cisco ASA, Wireshark, Packet Tracer, Linux',
    worksLabel: '[Featured Labs]',
    works: [
      'ENTERPRISE CAMPUS NETWORK — 3-Tier Hierarchical LAN, 19 Devices',
      'MULTI-ROUTER WAN & OSPF — Dual-Stack IPv4/IPv6 Routing Lab',
      'SECURE LAN — Hardened Access Layer, ASA Perimeter & DMZ'
    ],
    currently: 'Pursuing CCNA certification & building new Packet Tracer labs.'
  },
  programming: {
    titleLines: ['I ALSO DEVELOP', 'WEBSITES FOR FUN'],
    watermark: '自己紹介',
    profileLabel: '[Profile]',
    profile: "Final-year B.Tech Computer Science student building full-stack products with React, Python, and FastAPI. Shipped four production apps — from an AI background-removal model to a real-time flight-booking platform — and single-handedly designed, deployed, and SEO-optimized an IoT startup's corporate website end to end.",
    stackLabel: '[Tech Stack]',
    stack: 'React, JavaScript, Python, FastAPI, Node.js, MySQL, Supabase, Linux, Cisco Packet Tracer, Git, Figma',
    worksLabel: '[Featured Works]',
    works: [
      'TRAVELWISE — Full-Stack Flight Booking & Real-Time Tracking',
      'PIXEL FORGE AI — AI Image Platform powered by Gemini API',
      'BG REMOVER — AI Background Removal, Trained & Deployed on Hugging Face',
      'SK JALRAKSHAK — Corporate Platform for an IIT Delhi-Incubated Startup'
    ],
    currently: 'Pursuing CCNA certification & shipping new projects.'
  }
};

const Hero = ({ variant = 'network' }) => {
  const content = CONTENT[variant] ?? CONTENT.network;
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.kaisei-hero__line-inner');

      gsap.set(lines, { yPercent: 118 });
      gsap.set('.kaisei-hero__watermark', { opacity: 0, scale: 1.09 });
      gsap.set('.kaisei-hero__footer-row', { opacity: 0, y: 26 });

      const reveal = gsap.timeline({ paused: true })
        .to(lines, {
          yPercent: 0,
          duration: 1.25,
          ease: 'power4.out',
          stagger: 0.11
        }, 0)
        .to('.kaisei-hero__watermark', {
          opacity: 0.45,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out'
        }, 0.1)
        .to('.kaisei-hero__footer-row', {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        }, 0.55);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reveal.progress(1);
        return;
      }

      const start = () => reveal.play();

      if (document.querySelector('.preloader-container')) {
        window.addEventListener('preloader:done', start, { once: true });
      } else {
        start();
      }

      return () => window.removeEventListener('preloader:done', start);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          yPercent: -30,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      gsap.fromTo('.kaisei-story__img-wrapper',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.kaisei-story__img-wrapper',
            start: 'top 88%',
            once: true
          }
        }
      );

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -12, scale: 1.15 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="kaisei-home-wrapper" ref={sectionRef}>
      <img
        src="/porsche-logo.webp"
        alt="Porsche crest"
        className="kaisei-hero__crest"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <section className="kaisei-hero">
        <div className="kaisei-hero__watermark">
          {content.watermark}
        </div>
        <div className="kaisei-container kaisei-hero__grid">
          <h1 className="kaisei-hero__title" ref={titleRef}>
            {content.titleLines.map((line) => (
              <span className="kaisei-hero__line" key={line}>
                <span className="kaisei-hero__line-inner">{line}</span>
              </span>
            ))}
          </h1>

          <div className="kaisei-hero__footer-row">
            <p className="kaisei-hero__about-label">
              About me
            </p>
            <div className="kaisei-scroll" aria-label="Scroll">
              <span className="kaisei-scroll__text">Scroll</span>
              <span className="kaisei-scroll__text kaisei-scroll__text--clone" aria-hidden="true">Scroll</span>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="kaisei-story" ref={storyRef}>
        <div className="kaisei-container kaisei-story__grid">
          <div className="kaisei-story__img-col">
            <div className="kaisei-story__img-wrapper">
              <img
                src={heroImg}
                alt="Koushik Nagabhatla Portrait"
                className="kaisei-story__img"
                ref={imgRef}
                width="500"
                height="680"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>

          <div className="kaisei-story__stat-col">
            <span className="kaisei-story__stat-label">[Academic Year]</span>
            <div className="kaisei-story__stat-num">4<span className="kaisei-story__stat-unit">TH</span></div>
          </div>

          <div className="kaisei-story__profile-col">
            <h2 className="kaisei-story__section-title">info</h2>
            <div className="kaisei-story__profile-grid">
              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">{content.profileLabel}</span>
                <p className="kaisei-profile__text">
                  {content.profile}
                </p>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">{content.stackLabel}</span>
                <p className="kaisei-profile__text">
                  {content.stack}
                </p>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">{content.worksLabel}</span>
                <ul className="kaisei-profile__text kaisei-profile__works">
                  {content.works.map((work) => (
                    <li key={work}>{work}</li>
                  ))}
                </ul>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Currently]</span>
                <p className="kaisei-profile__text">{content.currently}</p>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Languages]</span>
                <p className="kaisei-profile__text">English, Telugu, Hindi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
