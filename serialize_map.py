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
        row = random.choice(dungeon)
        while True:  # find an empty spot to place it
            idx = random.randint(0, len(row)-1)
            if row[idx] == "F":
                row[idx] = ltr
                break
    return dungeon

with open('map.csv', 'r') as map_file:
    csv_reader = csv.reader(map_file)
    dungeon = []
    for row in csv_reader:
        new_row = []
        for char in row:
            new_row.append(char)
        dungeon.append(new_row)



for key in things:
    dungeon = assign_stuff(dungeon, key, things[key])

with open('map.json', 'w+') as writer:
        json.dump(dungeon, writer)
