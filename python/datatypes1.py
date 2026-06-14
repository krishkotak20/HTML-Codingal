fruits = ["apple", "banana", "orange", "mango", "strawberry"]


print("fruit list:", fruits)

print("total fruits:", len(fruits))
print("first fruit:", fruits[0])
print("last fruit:", fruits[-1])
print("first three:", fruits[:3])

fruits.append("blueberry")
print("/nAfter adding blueberry:", fruits)
fruits.remove("banana")
print("after removing banana:", fruits)
fruits.sort()
print("sorted alphabetically:", fruits)
fruits.reverse()
print("reversed:", fruits)

fruit = {"name": "mango", "subject": "eating", "experience": 5}
print("/nFruit profile", fruit)

print("subject:", fruit["subject"])

print("experience:", fruit.get("experience", "not found"))
fruit["experience"] = 6
fruit["taste"] = "very good"
fruit.pop("experience")
print("updated fruit profile:", fruit)

quantity = [1, 2, 3, 4, 5]
names= ["mango", "apple", "banana", "orange", "strawberry"]

fruits = dict(zip(quantity, names))
print(fruits)


print(fruits[4])


