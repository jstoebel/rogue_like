import csv
import json
import random


things = {
'P' : 1,
'M' : 10,
'B' : 1,
'W' : 5,
'H' : 10,
}

def assign_stuff(dungeon, ltr, count):
    """
    randomly places count number of ltr in an empty spot in dungeon (F)
    """

    for i in range(count):
        while True:  # find an empty spot to place it
            idx = random.randint(0, len(dungeon)-1)
            if dungeon[idx] == "F":
                dungeon[idx] = ltr
                break
    return dungeon

with open('map.csv', 'r') as map_file:
    csv_reader = csv.reader(map_file)
    dungeon = []
    for row in csv_reader:
        dungeon += row

assert len(dungeon) == 50 ** 2


for key in things:
    dungeon = assign_stuff(dungeon, key, things[key])
    assert key in dungeon

with open('map.json', 'w+') as writer:
        json.dump(dungeon, writer)
