import './WorksPage.css';

import img1 from '../assets/projects/project1.webp';
import img2 from '../assets/projects/project2.webp';
import img3 from '../assets/projects/project3.webp';
import img4 from '../assets/projects/project4.webp';
import net1 from '../assets/projects/net1.webp';
import net2 from '../assets/projects/net2.webp';
import net3 from '../assets/projects/net3.webp';

const WORKS = {
  network: {
    title: 'NETWORK LABS',
    subtitle: 'Enterprise topologies designed, configured, hardened, and verified on Cisco IOS.',
    cta: 'View on GitHub',
    projects: [
      {
        name: 'SECURE LAN',
        category: 'LAYER-2 SECURITY & DMZ',
        desc: 'Segmented campus LAN with a hardened access layer — Port Security, DHCP Snooping, Dynamic ARP Inspection, and BPDU Guard — sitting behind an ASA perimeter firewall with a published DMZ and an OSPF branch site. 28 devices and 23 documented tests split between reachability that must work and controls that must block.',
        stack: 'Cisco ASA · DAI · DHCP Snooping · Wireshark',
        role: 'Design, Hardening & Packet Analysis',
        image: net3,
        imageWidth: 1200,
        imageHeight: 675,
        url: 'https://github.com/koushiknagabhatla-ctrl/Secure-LAN-CPT'
      },
      {
        name: 'ENTERPRISE CAMPUS NETWORK',
        category: '3-TIER CAMPUS LAN DESIGN',
        desc: 'Three-tier hierarchical campus built around departmental VLANs, 802.1Q trunking, SVI inter-VLAN routing, DHCP relay, Rapid PVST+, EtherChannel, and single-area OSPF reaching a branch site over a WAN. 19 devices, 21 links — every designed path validated with ping and traceroute, and three real build faults isolated and documented.',
        stack: 'Cisco IOS · OSPF · RPVST+ · EtherChannel',
        role: 'Design, Configuration & Validation',
        image: net1,
        imageWidth: 1200,
        imageHeight: 675,
        url: 'https://github.com/koushiknagabhatla-ctrl/enterprise-project-cpt'
      },
      {
        name: 'MULTI-ROUTER WAN & OSPF',
        category: 'WAN ROUTING LAB',
        desc: 'Multi-router WAN topology running dual-stack IPv4/IPv6 addressing alongside static routes, default routes, and single-area OSPF. Neighbour adjacencies, routing-table contents, and end-to-end reachability verified hop by hop, with Layer-2 and Layer-3 faults traced from wrong gateways and interface problems through to misconfigured routing.',
        stack: 'Cisco IOS · OSPF · IPv4/IPv6 · Static Routing',
        role: 'Configuration & Troubleshooting',
        image: net2,
        imageWidth: 1200,
        imageHeight: 675,
        url: 'https://github.com/koushiknagabhatla-ctrl/multi-router-wan-and-ospf'
      }
    ]
  },
  webdev: {
    title: 'SELECTED WORKS',
    subtitle: 'A curated collection of digital platforms & engineering achievements.',
    cta: 'Launch Website',
    projects: [
      {
        name: 'BG REMOVER',
        category: 'AI BACKGROUND REMOVAL',
        desc: 'AI-powered background removal tool that isolates subjects with clean, precise edges across portraits, products, and automotive shots. Model trained on multiple datasets including rembg 2.0 and published to Hugging Face.',
        stack: 'React · Vite · Hugging Face',
        role: 'Design & Development',
        image: img4,
        imageWidth: 1200,
        imageHeight: 596,
        url: 'https://bgrem.site/'
      },
      {
        name: 'TRAVELWISE',
        category: 'FLIGHT BOOKING PLATFORM',
        desc: 'Full-stack Indian flight booking platform featuring real-time flight tracking, live fare comparison, and Supabase authentication. Engineered with React, FastAPI, and Supabase.',
        stack: 'React · FastAPI · Supabase',
        role: 'Design & Development',
        image: img1,
        imageWidth: 1200,
        imageHeight: 597,
        url: 'https://travelwisetheta.vercel.app/'
      },
      {
        name: 'PIXEL FORGE AI',
        category: 'AI IMAGE PLATFORM',
        desc: 'AI image engineering platform powered by React/Vite and a serverless FastAPI Python backend. Integrates the Google Gemini API for intelligent image processing and enhancement.',
        stack: 'React · Vite · Gemini API',
        role: 'Design & Development',
        image: img2,
        imageWidth: 1200,
        imageHeight: 603,
        url: 'https://pixelforgeaisix.vercel.app/'
      },
      {
        name: 'SK JALRAKSHAK',
        category: 'IIT DELHI INCUBATED STARTUP',
        desc: 'Corporate website independently engineered from scratch for an IIT Delhi-incubated IoT startup. Built complete UI/UX, domain & DNS configuration, Vercel deployment, and on-page SEO.',
        stack: 'React · Vercel · SEO',
        role: 'Design & Development',
        image: img3,
        imageWidth: 1200,
        imageHeight: 597,
        url: 'https://www.skjal.in/'
      }
    ]
  }
};

const WorksPage = ({ variant = 'network' }) => {
  const { title, subtitle, cta, projects } = WORKS[variant] ?? WORKS.network;

  return (
    <section id="works" className="awwwards-master-container">
      <div className="awwwards-header">
        <h2 className="header-title">{title}</h2>
        <p className="header-subtitle">{subtitle}</p>
      </div>

      <div className="awwwards-projects-list" role="list">
        {projects.map((project, i) => (
          <article className="work-item" key={project.name} role="listitem">
            <div className="work-item__info">
              <span className="work-item__category">
                {String(i + 1).padStart(2, '0')} // {project.category}
              </span>
              <h3 className="work-item__title">{project.name}</h3>
              <p className="work-item__desc">{project.desc}</p>

              <div className="work-item__detail">
                <div>
                  <span>Stack</span>
                  <p>{project.stack}</p>
                </div>
                <div>
                  <span>Role</span>
                  <p>{project.role}</p>
                </div>
              </div>

              <a
                className="work-item__link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${cta} — ${project.name}`}
              >
                <span className="work-item__link-circle" aria-hidden="true">
                  <span className="work-item__link-dot"></span>
                </span>
                <span className="work-item__link-text">{cta}</span>
              </a>
            </div>

            <a
              className="work-item__img"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — ${cta}`}
              tabIndex="-1"
            >
              <img src={project.image} alt={`${project.name} — ${project.category}`} loading="lazy" decoding="async" width={project.imageWidth} height={project.imageHeight} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorksPage;
