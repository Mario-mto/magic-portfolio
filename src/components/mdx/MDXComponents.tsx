import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import styles from "./mdx.module.css";

const components = {
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={styles.h2} {...p} />,
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={styles.h3} {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className={styles.p} {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className={styles.ul} {...p} />,
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className={styles.li} {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={styles.a} target="_blank" rel="noreferrer" {...p} />
  ),
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className={styles.strong} {...p} />,
  hr: () => <hr className={styles.hr} />,
  img: (p: { src?: string; alt?: string }) => (
    <span className={styles.imgWrap}>
      <Image src={p.src || ""} alt={p.alt || ""} width={1200} height={675} className={styles.img} />
    </span>
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
