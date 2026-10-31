"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { asset } from "@/lib/base-path";

/*
  Anel 3D de fotos (three.js): painéis curvos numa circunferência.
  - gira sozinho, acelera com a rolagem e pode ser arrastado (mouse ou dedo);
  - inclina seguindo o mouse;
  - o painel mais à frente fica nítido; os de trás somem na névoa.
*/
export function PhotoRing({ photos, onReady }: { photos: string[]; onReady?: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      queueMicrotask(() => setFailed(true));
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1b1612, 9, 17);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    // painéis num anel; cada um é um plano curvado para acompanhar a circunferência
    const R = 4.4;
    const n = photos.length;
    const step = (Math.PI * 2) / n;
    const pw = 2 * R * Math.sin(step / 2) * 0.86;
    const ph = pw * 1.25;
    const ring = new THREE.Group();
    const tilt = new THREE.Group();
    tilt.add(ring);
    scene.add(tilt);

    const loader = new THREE.TextureLoader();
    let loaded = 0;
    const mats: THREE.MeshBasicMaterial[] = [];
    photos.forEach((src, i) => {
      const geo = new THREE.PlaneGeometry(pw, ph, 24, 1);
      const pos = geo.attributes.position;
      const span = pw / R; // ângulo ocupado pelo painel
      for (let v = 0; v < pos.count; v++) {
        const x = pos.getX(v);
        const a = (x / pw) * span;
        pos.setX(v, Math.sin(a) * R);
        pos.setZ(v, Math.cos(a) * R - R);
      }
      geo.computeVertexNormals();
      const mat = new THREE.MeshBasicMaterial({ color: 0x2a221c, side: THREE.DoubleSide, transparent: true });
      mats.push(mat);
      loader.load(asset(src), (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        mat.map = tex;
        mat.color.set(0xffffff);
        mat.needsUpdate = true;
        if (++loaded === photos.length) onReady?.();
      });
      const mesh = new THREE.Mesh(geo, mat);
      const holder = new THREE.Group();
      mesh.position.z = R;
      holder.add(mesh);
      holder.rotation.y = i * step;
      // alturas alternadas dão ritmo ao anel
      holder.position.y = (i % 2 ? -1 : 1) * 0.18;
      ring.add(holder);
    });

    // poeira de luz
    const dust = new THREE.BufferGeometry();
    const pts = new Float32Array(260 * 3);
    for (let i = 0; i < 260; i++) {
      const r = 2 + Math.random() * 7;
      const a = Math.random() * Math.PI * 2;
      pts[i * 3] = Math.cos(a) * r;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pts[i * 3 + 2] = Math.sin(a) * r;
    }
    dust.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xe8cfb0, size: 0.03, transparent: true, opacity: 0.55, depthWrite: false });
    const points = new THREE.Points(dust, dustMat);
    scene.add(points);

    let w = 0, h = 0, wide = true;
    const resize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      wide = w >= 768;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // no computador o anel fica à direita (o texto ocupa a esquerda); no celular, centralizado e mais longe
      camera.position.set(wide ? -3.2 : 0, wide ? 1.3 : 1.6, wide ? 13.4 : 15.5);
      camera.lookAt(wide ? -3.2 : 0, wide ? 0 : -2.6, 0);
      tilt.position.x = wide ? 0.6 : 0;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // interação
    let mx = 0, my = 0, tx = 0, ty = 0;
    let rot = 0, vel = reduced ? 0 : 0.0025, drag = false, lastX = 0, lastScroll = window.scrollY;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (drag) {
        vel = (e.clientX - lastX) * 0.0016;
        rot += vel;
        lastX = e.clientX;
      }
    };
    const onDown = (e: PointerEvent) => {
      drag = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const onUp = () => (drag = false);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const base = reduced ? 0 : 0.0022;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const sy = window.scrollY;
      const sv = sy - lastScroll;
      lastScroll = sy;
      if (!drag) {
        vel += (base - vel) * 0.03; // volta à velocidade de cruzeiro
        if (!reduced) vel += sv * 0.00004; // a rolagem empurra o anel
        rot += vel;
      }
      ring.rotation.y = rot;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      tilt.rotation.x = 0.1 + my * 0.08;
      tilt.rotation.z = -0.06 + mx * 0.04;
      tilt.rotation.y = mx * 0.12;
      // ao rolar para baixo, o anel recua e sobe levemente
      const p = Math.min(sy / Math.max(h, 1), 1);
      tilt.position.y = p * 1.4;
      tilt.position.z = -p * 3;
      points.rotation.y = -rot * 0.3;
      // painéis de trás ficam mais apagados
      ring.children.forEach((g, i) => {
        const a = (((g.rotation.y + rot) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const front = (Math.cos(a) + 1) / 2;
        mats[i].opacity = 0.35 + front * 0.65;
      });
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry.dispose();
          const m = o.material as THREE.MeshBasicMaterial;
          m.map?.dispose();
          m.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [photos, onReady]);

  if (failed) return null;
  return <div ref={host} className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing" data-cursor="Arraste" aria-hidden />;
}
