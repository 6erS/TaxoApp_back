export const MessageType = {
    getTariffsAndDrivers: 'tariffs',
    sendInviteToDrivers: 'inviteDrivers',
    orderConfirmedByDriver: 'confirmationFromDriver'
}

export const OrderStatus = {
    isConfirmed: "The driver moves towards the passenger",
    inProgress: "The driver is carrying the passenger",
    isCompleted: "The passenger has reached the destination",
    isAborted: "The order have been aborted"
}