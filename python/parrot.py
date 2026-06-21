class Parrot:
     def __init__(self, name, age):
          self.name = name
          self.age = age

     def sing(self, song):
               return "{} sings {}".format(self.name, song)
     def dance(self):
               return "{} is now dancing".format(self.name)
          
blu = Parrot("blu", 10)
obj2 = Parrot("krish",13)

print(blu.sing("'happy'"))
print(blu.dance())
print(obj2.sing("perfect"))
print(obj2.dance())