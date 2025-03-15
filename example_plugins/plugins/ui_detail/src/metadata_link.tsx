import { Detail } from "@project-gauntlet/api/components";
import { ReactNode } from "react";

export default function Main(): ReactNode {
    return (
        <Detail>
            <Detail.Metadata>
                <Detail.Metadata.Link label={"Wiki"} href="https://starwars.fandom.com/wiki/Ezaraa">Link</Detail.Metadata.Link>
            </Detail.Metadata>
        </Detail>
    )
}
