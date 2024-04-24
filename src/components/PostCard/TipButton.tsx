import { FaDonate } from "react-icons/fa"
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Image
} from "@chakra-ui/react"
import { useState } from "react"
import usePosts from "@/hooks/usePosts"
import TipModal from "./TipModal"
import { usePostContext } from "@/contexts/PostContext";
import { useUserData } from "@/hooks/useUserData"
import HiveTipModal from "./HiveTipModal"

export default function TipButton() {
    const [isTipModalOpen, setIsTipModalOpen] = useState(false)
    const [token, setToken] = useState("")
    const { post } = usePostContext()
    const [author] = post?.author.split("/") || []
    const userData = useUserData(author)
    const [authorETHwallet, setAuthorETHwallet] = useState("")
    const [isHiveTipModalOpen, setIsHiveTipModalOpen] = useState(false)
    const openBaseTipModal = (token: string) => {
        setToken(token)
        setIsTipModalOpen(true)
        setAuthorETHwallet(JSON.parse(userData.json_metadata).extensions.eth_address)

    }

    const handleHiveTipClick = () => {
        setIsHiveTipModalOpen(true)
    }

    return (
        <Menu >
            <MenuButton leftIcon={<FaDonate />} w={"auto"} as={Button} color="limegreen" variant={"outline"} size="sm">
                Tip
            </MenuButton>
            <MenuList bg="black" >
                <MenuItem
                    bg="black"
                    _hover={{ bg: "red.500", color: "black" }}

                    onClick={
                        () => handleHiveTipClick()
                    }
                >
                    <Image mr={3} boxSize={"20px"} src="https://cryptologos.cc/logos/hive-blockchain-hive-logo.png" />
                    $HIVE
                </MenuItem>
                <MenuItem
                    bg="black"
                    _hover={{ bg: "green.500", color: "black" }}

                    onClick={
                        () => openBaseTipModal('SENDIT')
                    }
                >
                    <Image mr={3} boxSize={"20px"} src="https://sendit.city/assets/images/image03.jpg?v=c141f3fc" />
                    $SENDIT
                </MenuItem>
                <MenuItem
                    bg="black"
                    _hover={{ bg: "yellow.500" }}

                    onClick={
                        () => openBaseTipModal('NOGS')
                    }

                >
                    <Image mr={3} boxSize={"20px"} src="https://app.noggles.com/svg/moon-logo.svg" />
                    $NOGS
                </MenuItem>
                <MenuItem
                    bg="black"
                    _hover={{ bg: "blue.500" }}

                    onClick={
                        () => openBaseTipModal('MEMBER')
                    }
                ><Image mr={3} boxSize={"20px"} src="https://member.clinic/images/01-1.jpg" />
                    $MEMBER</MenuItem>

            </MenuList>
            <TipModal
                isOpen={isTipModalOpen}
                onClose={() => setIsTipModalOpen(false)}
                token={token}
                author={author}
                authorETHwallet={authorETHwallet}
            />
            <HiveTipModal
                isOpen={isHiveTipModalOpen}
                onClose={() => setIsHiveTipModalOpen(false)}
                author={author}
            />
        </Menu>

    )
}
