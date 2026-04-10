"use client";

import { useTheme } from "@/context/ThemeContext";
import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

interface LockedModalProps {
  open: boolean;
  videoTitle: string;
  onClose: () => void;
}

export default function LockedModal({ open, videoTitle, onClose }: LockedModalProps) {
  const { t } = useTheme();

  return (
    <Modal open={open} onClose={onClose} maxWidth={360}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: t.locked,
            border: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
          }}
        >
          <Icon name="lock" size={22} color={t.muted} />
        </div>

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 19,
            letterSpacing: "-.4px",
            color: t.text,
            marginBottom: 10,
          }}
        >
          Lesson Locked
        </h2>

        <p
          style={{
            fontSize: 13.5,
            color: t.muted,
            lineHeight: 1.65,
            marginBottom: 24,
          }}
        >
          <strong style={{ color: t.text }}>"{videoTitle}"</strong>
          <br />
          <br />
          Complete the previous lesson to unlock this one. Sequential learning keeps
          every concept building on the last.
        </p>

        <Button fullWidth size="lg" onClick={onClose}>
          Got it
        </Button>
      </div>
    </Modal>
  );
}
