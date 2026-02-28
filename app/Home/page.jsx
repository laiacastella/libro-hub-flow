'use client';
import { useRouter } from "next/navigation";
import styles from '../Home/home.module.css'
import { HeaderHome } from "@/components";


export default function Home() {
  const router = useRouter ()
  return ( 
    <main className={styles.contenedorPag}>
    <div className= {styles.contenedorPrincipal}>
       <div>
        <HeaderHome />
        </div> 
        <div className={styles.contenedorInfo}>

        </div>
    </div>
    </main>
  )
}