class Student:
    
    species = "human"

    def __init__(self, name, age):
        self.name= name
        self.age = age

blu = Student("krish",13)
woo = Student("divya",18)

print("krish is a {}".format(blu.species))
print("divya is also a {}".format(woo.species))

print("{} is {} years old".format(blu.name, blu.age))
print("{} is {} years old".format(woo.name, woo.age))