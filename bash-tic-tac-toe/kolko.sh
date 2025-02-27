#!/bin/bash

declare -A board

rows=3
collumns=3


### wypisywanie wartosci board
printf "${board[0,1]}"

function print_Readme(){
    echo     Tic-Tac-Toe 1.0
    echo commands:
    echo \> type "start a new game or reasume the last one" to begin the game
    echo \> type load {filename} to load game and reasume from saved gamestate
    echo \> type list-saves to list all available save files
    echo \> type q to exit

}

function draw_board(){
    printf "%2s" "------"
    echo
    for((i=0;i<rows;i++)) do 
        for((j=0;j<collumns;j++)) do
            printf "%2s" "${board[$i,$j]}|"
        done
        echo
    done
    printf "%2s" "------"
    echo
}

function init_board(){
    for((i=0;i<rows;i++)) do
        for((j=0;j<collumns;j++)) do
            board[$i,$j]='#'
        done
    done
}

function mark_board() {

    local x=$1
    local y=$2
    local type=$3 

    if [[ $x -ge 0 && $x -lt 3 && $y -ge 0 && $y -lt 3 ]]; then
        if [[ "${board[$x,$y]}" == " " ]]; then
            board[$x,$y]=$type
            return 0
        else
            echo "Field ($x, $y) is already occupied."
            return 1
        fi
    else
        echo "Error: Invalid coordinates. Please enter values between 0 and 2."
        return 1
    fi
}


check_game_over() {
   
    for ((i=0; i<rows; i++)); do

        if [[ "${board[$i,0]}" != " " && "${board[$i,0]}" == "${board[$i,1]}" && "${board[$i,1]}" == "${board[$i,2]}" ]]; then
            echo "Player ${board[$i,0]} wins!"
            return 0
        fi
       
        if [[ "${board[0,$i]}" != " " && "${board[0,$i]}" == "${board[1,$i]}" && "${board[1,$i]}" == "${board[2,$i]}" ]]; then
            echo "Player ${board[0,$i]} wins!"
            return 0
        fi
    done

    # Check diagonals for a win
    if [[ "${board[0,0]}" != " " && "${board[0,0]}" == "${board[1,1]}" && "${board[1,1]}" == "${board[2,2]}" ]]; then
        echo "Player ${board[0,0]} wins!"
        return 0
    fi
    if [[ "${board[0,2]}" != " " && "${board[0,2]}" == "${board[1,1]}" && "${board[1,1]}" == "${board[2,0]}" ]]; then
        echo "Player ${board[0,2]} wins!"
        return 0 
    fi

    for ((i=0; i<rows; i++)); do
        for ((j=0; j<3; j++)); do
            if [[ "${board[$i,$j]}" == "#" ]]; then
                return 1 
            fi
        done
    done

    echo "It's a draw!"
    return 0 
}

check_game_in_progress

function game(){

    if check_game_in_progress; then
        init_board
    fi

    
    
    while true; do
        if check_game_over; then
            

            save_game
        fi
        break
    done
    cleanup_save
}


function init_board_kek(){
    for((i=0;i<rows;i++)) do
        for((j=0;j<collumns;j++)) do
            board[$i,$j]='X'
        done
    done
}

function load_game(){
    source test.sh
}

function save_game() {
    declare -p board > test.sh
}




# Main menu loop
while true; do
    print_Readme
    read x
    if [[ "$x" == "q" ]]; then
        break
    fi
done