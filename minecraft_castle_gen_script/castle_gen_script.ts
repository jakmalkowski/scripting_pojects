player.onChat("generateCastle", function () {
    buildCastle()
})

let length = 32
let pos1 = player.position()
let pos2 = getPositionWithOffset(pos1, length, 0, 0)
let pos3 = getPositionWithOffset(pos1, 0, 0, length)
let pos4 = getPositionWithOffset(pos1, length, 0, length)
let pos5 = getPositionWithOffset(pos1, length/2, 0, length/2)

function getPositionWithOffset(pos: Position,x: number,y: number,z: number) {
    return pos.add(positions.create(x,y,z));
}

function buildCastleWalls() {
    buildWall(pos1,pos2,STONE_BRICKS,5)
    buildWall(pos2, pos4, STONE_BRICKS,5)
    buildWall(pos4, pos3, STONE_BRICKS,5)
    buildWall(pos3, pos1, STONE_BRICKS,5)
    buildGate(4)
}

function buildGate(gateWidth: number){
    let offset1 = getPositionWithOffset(pos1,length/2 -gateWidth/2,0,0)
    let offset2 = getPositionWithOffset(pos1,length/2 + gateWidth/2,0,0)
    let offset3 = getPositionWithOffset(offset1, 0,-1,0);
    let offset4 = getPositionWithOffset(pos1,length/2 + gateWidth/2,-2, -5)
    buildWall(offset1,offset2,AIR, 3)
    blocks.fill(PLANKS_DARK_OAK,offset3,offset4)
}

function buildInnerCastle() {
    let internalTowerWidth = 10
    let internalTowerHeight = 12
    let internalPos1 = getPositionWithOffset(pos5, -internalTowerWidth / 2, 0, -internalTowerWidth/2)
    let internalPos2 = getPositionWithOffset(pos5, internalTowerWidth / 2, 0, -internalTowerWidth/2)
    let internalPos3 = getPositionWithOffset(pos5, -internalTowerWidth/2, 0, internalTowerWidth/2)
    let internalPos4 = getPositionWithOffset(pos5, internalTowerWidth/2, 0, internalTowerWidth/2)
    buildTowerOnCord(internalPos1, 6, 5)
    buildTowerOnCord(internalPos2, 6, 5)
    buildTowerOnCord(internalPos3, 6, 5)
    buildTowerOnCord(internalPos4, 6, 5)
    buildCentralTower(pos5, internalTowerHeight, internalTowerWidth)
    let [fillment1, fillment2] = [
        pos5.add(newPosition(internalTowerWidth / 2, 0, internalTowerWidth / 2)),
        pos5.add(newPosition(-internalTowerWidth / 2, internalTowerHeight, -internalTowerWidth / 2))
    ];
}


function addPavement(pos1: Position, pos2: Position){
    blocks.fill(COBBLESTONE, getPositionWithOffset(pos1,0,-1,0), getPositionWithOffset(pos2,0,-1,0))
}

function buildWall(pos1: Position, pos2: Position, material: Block, height: number){
    builder.teleportTo(pos1)
    builder.mark()
    builder.teleportTo(pos2)
    builder.raiseWall(material,height)
}

function buildCastle() {
    buildMoat()
    addPavement(pos1,pos4)
    buildCastleWalls()
    buildTowerOnCord(pos1, 8, 6)
    buildTowerOnCord(pos2, 8, 6)
    buildTowerOnCord(pos3, 8, 6)
    buildTowerOnCord(pos4, 8, 6)
    buildInnerCastle()
}

function newPosition(x: number, y: number, z: number): Position {
    return positions.create(x, y, z);
}

function buildCentralTower(pos: Position, height: number, width: number) {
    let [pos1, pos2] = [
        pos.add(newPosition(width / 2, 0, width / 2)),
        pos.add(newPosition(-width / 2, height, -width / 2))
    ];
    blocks.fill(CRACKED_STONE_BRICKS, pos1, pos2);
    blocks.fill(AIR, pos1.add(positions.create(-1, 1, -1)), pos2.add(positions.create(1, -1, 1)))

    let crownPosition = getPositionWithOffset(pos1, 0, height + 1, 0)
    let [crownPosition1, crownPosition2] = [
        getPositionWithOffset(pos1, 0, height + 1, 0),
        getPositionWithOffset(pos2, 0, 1, 0)
    ]
    blocks.fill(MOSSY_COBBLESTONE_WALL, crownPosition1, crownPosition2);
    blocks.fill(AIR, crownPosition1.add(positions.create(-1, 0, -1)), crownPosition2.add(positions.create(1, 0, 1)))
}

function buildTowerOnCord(pos: Position, height: number, width: number) {
    let [pos1, pos2] = [
        pos.add(newPosition(width / 2, 0, width / 2)),
        pos.add(newPosition(-width / 2, height, -width / 2))
    ];
    blocks.fill(MOSSY_STONE_BRICKS, pos1, pos2);
    blocks.fill(AIR,pos1.add(positions.create(-1,1,-1)),pos2.add(positions.create(1,-1,1)))
    let crownPosition = getPositionWithOffset(pos1, 0, height+1 , 0)
    let [crownPosition1, crownPosition2] = [
        getPositionWithOffset(pos1, 0, height + 1, 0),
        getPositionWithOffset(pos2, 0, 1, 0)
    ]
    blocks.fill(COBBLESTONE_WALL, crownPosition1, crownPosition2);
    blocks.fill(AIR,crownPosition1.add(positions.create(-1,0,-1)),crownPosition2.add(positions.create(1,0,1)))
}

function buildMoat() {
    let moatOffset = 3
    let [moatPos1,moatPos2] = [
        getPositionWithOffset(pos1,-moatOffset,-1,-moatOffset),
        getPositionWithOffset(pos4,moatOffset,-moatOffset, moatOffset)
    ]

    blocks.fill(WATER,moatPos1,moatPos2)
}