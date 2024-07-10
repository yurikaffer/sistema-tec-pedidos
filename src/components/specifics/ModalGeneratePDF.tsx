import { RequestDto } from '@/dto/requestDto';
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import generatePDF, { Margin } from 'react-to-pdf';
import Report from '../report/report';

interface ModalGeneratePDFProps {
    isOpen: boolean
    onClose: () => void
    request: RequestDto
}

export default function ModalGeneratePDF({ isOpen, onClose, request }: ModalGeneratePDFProps) {
    const getTargetElement = () => document.getElementById('report')

    const handleGeneratePDF = async () => {
        generatePDF(getTargetElement, {
            method: 'open',
            page: {
                margin: Margin.MEDIUM,
                format: 'A4',
                orientation: 'portrait',
            },
        })
    }

    return (
        <Modal className="bg-white" backdrop="blur" isOpen={isOpen} onOpenChange={onClose} size="5xl">
            <ModalContent>
                <ModalBody className="p-10">
                    <div id="report">
                        <Report request={request} />
                    </div>
                </ModalBody>
                <ModalFooter className="pr-10 pb-10">
                    <Button onPress={handleGeneratePDF} color="primary" className="mt-[1rem]">
                        Download
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}