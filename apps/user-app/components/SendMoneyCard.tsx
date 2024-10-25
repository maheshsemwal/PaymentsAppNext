"use client"
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/text-input'
import React from 'react'
import { p2pTransfer } from '../app/lib/actions/p2ptransfer'

const SendMoneyCard = () => {
    const [amount, setAmount] = React.useState("");
    const [email, setEmail] = React.useState("");
    return (
        <div className='w-1/2 m-2'>
            <Card title="P2P Transfer " className="border p-6 rounded-xl bg-[#ededed]">
                <TextInput placeHolder="Enter Mobile Number or Email" onChange={(value) => {
                    setEmail(value)
                }} label={"Email or Phone"} />
                <TextInput placeHolder="Amount" onChange={(value) => {
                    setAmount(value);
                }} label={"Amount"} />
                <div className="w-full text-center m-2">

                    <Button onClick={async () => {
                        await p2pTransfer(email, Number(amount)*100);
                    }}>Send Money</Button>
                </div>
            </Card>
        </div>
    )
}

export default SendMoneyCard
