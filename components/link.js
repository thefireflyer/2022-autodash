import Link from "next/link"
import { Link as MuiLink } from "@mui/material"

export const AltLink = (props) => {
    return <Link {...props} >
        <MuiLink {...props} sx={{width:`100%`, height:`100%`}} />
    </Link>
}