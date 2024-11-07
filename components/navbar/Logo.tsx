import Link from "next/link"
import Image from "next/image"  
import { Button } from "../ui/button"
import LogoIcon from '../../app/LogoIcon.png'  

export default function Logo() {
    return (
        <Button size="icon" asChild>
            <Link href='/'>
                <Image
                    src={LogoIcon}    
                    alt="Logo"        
                    width={32}        
                    height={32}       
                />
            </Link>
        </Button>
    )
}