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
    profile: 'B.Tech Computer Science student graduating in 2027, with hands-on experience designing, configuring, and troubleshooting enterprise-grade networks. Comfortable across multi-switch and multi-router topologies — VLANs, 802.1Q trunking, inter-VLAN routing, OSPF, STP, EtherChannel, ACLs, and Layer-2 security on Cisco IOS. Strong in subnetting, packet analysis with Wireshark, and systematic fault isolation.',
    experience: 'Network Engineer Intern — SK Jalrakshak Innovations (SKJAL), 2026. Configured access-layer switching for the office LAN and IoT deployments, deployed and verified static, default, and single-area OSPF routing between site routers, and hardened the access layer with Port Security, DHCP Snooping, Dynamic ARP Inspection, and BPDU Guard.',
    stackGroups: [
      {
        label: '[Routing & Switching]',
        items: 'Cisco IOS · VLANs · 802.1Q Trunking · Inter-VLAN Routing · STP/RPVST+ · EtherChannel · Static & Default Routing · OSPF'
      },
      {
        label: '[Network Security]',
        items: 'ACLs · SSH · Port Security · DHCP Snooping · Dynamic ARP Inspection · BPDU Guard · AAA Concepts'
      },
      {
        label: '[Protocols & Tools]',
        items: 'TCP/IP · OSI Model · IPv4/IPv6 · VLSM & Subnetting · ARP · ICMP · DHCP · DNS · NAT/PAT · Wireshark · Cisco Packet Tracer · Linux'
      }
    ],
    works: [
      'ENTERPRISE CAMPUS NETWORK — 3-Tier Hierarchical LAN, 19 Devices',
      'MULTI-ROUTER WAN & OSPF — Dual-Stack IPv4/IPv6 Routing Lab',
      'SECURE LAN — Hardened Access Layer, ASA Perimeter & DMZ'
    ],
    currently: 'Pursuing CCNA certification & building new Packet Tracer labs.'
  },
  webdev: {
    titleLines: ['I ALSO DEVELOP', 'WEBSITES FOR FUN'],
    watermark: '自己紹介'
  }
};

const Hero = ({ variant = 'network' }) => {
  const content = CONTENT[variant] ?? CONTENT.network;
  const hasStory = Boolean(content.profile);
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
        width="240"
        height="135"
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
            {hasStory && (
              <p className="kaisei-hero__about-label">
                About me
              </p>
            )}
            <div className="kaisei-scroll" aria-label="Scroll">
              <span className="kaisei-scroll__text">Scroll</span>
              <span className="kaisei-scroll__text kaisei-scroll__text--clone" aria-hidden="true">Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {hasStory && (
      <section id="story" className="kaisei-story" ref={storyRef}>
        <div className="kaisei-container kaisei-story__grid">
          <div className="kaisei-story__img-col">
            <div className="kaisei-story__img-wrapper">
              <img
                src={heroImg}
                alt="Koushik Nagabhatla Portrait"
                className="kaisei-story__img"
                ref={imgRef}
                width="1000"
                height="1500"
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
                <span className="kaisei-meta__label">[Profile]</span>
                <p className="kaisei-profile__text">
                  {content.profile}
                </p>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Experience]</span>
                <p className="kaisei-profile__text">
                  {content.experience}
                </p>
              </div>

              {content.stackGroups.map((group) => (
                <div className="kaisei-profile__item" key={group.label}>
                  <span className="kaisei-meta__label">{group.label}</span>
                  <p className="kaisei-profile__text">
                    {group.items}
                  </p>
                </div>
              ))}

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Featured Labs]</span>
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
      )}
    </div>
  );
};

export default Hero;
