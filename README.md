# Quoridor: On Online Instance
The rules of the game are pretty straight forward. It is a turn based game played on a 9x9 board and the goal is to reach the opponent's starting row. (check the figure below for more details)



![](figure1.png)


You can also built walls in order to prevent your oppenent from reaching their goal. To do so click on one of the tiles.

![](figure2.png)       


Here is the link to play the game: https://efbmachine.github.io/quoridor_client.js.

# Client

So the client was built in react in order to not have to move from one url to another.
React automatically updates the page but only the components that changed.
I also used Socket.io so we could say this app is event driven. The basis behind it is the following:

On the main page of the client you have three options:

![](figure3.png)






# Server

The server was built using socket.io and express. It allows a smooth communication between the users.
Let me explain how it work in a brief and simplified case.
When you play against someone else.
    ex:you click on "Create a Room"
    - client --(ask to create room)-->  server (creates room and place user in room)
    - (add the second user to the room) server <--[join a room]-- other client
    - client --(makes move) -->  server(check if move valid) -(send move)-> other client
    -                           <--()-- server --()-->

I hope you enjoy it.   
            -Keiffer
