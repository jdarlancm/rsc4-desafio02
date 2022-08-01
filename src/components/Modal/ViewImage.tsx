import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="pGray.900">
          <ModalCloseButton />
          <ModalBody mt={12}>
            <Image src={imgUrl} maxW="900px" maxH="600px" w="100%" h="100%" />
          </ModalBody>
          <ModalFooter
            bgColor="pGray.700"
            borderBottomLeftRadius={8}
            borderBottomRightRadius={8}
            h={6}
          >
            <Link href={imgUrl} isExternal>
              Abrir Original
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
