from abc import ABC, abstractmethod
class Animal(ABC):

    def __init__(self, name, habitat):
        self.name = name
        self.habitat = habitat

    def display(self):
        print(f"Name: {self.name}  | habitat: {self.habitat}")

    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):

    def __init__(self, name, habitat, breed):
        super().__init__(name, habitat)
        self.breed = breed
    def speak(self):
        print(f"{self.name} ({self.breed}) says: Woof! Woof! ")
    

class Parrot(Animal):

    def __init__(self, name, habitat, phrase):
        super().__init__(name, habitat,)
        self.phrase = phrase
        
    def speak(self):
        print(f"{self.name} says: {self.phrase}! {self.phrase}!")

class Lion(Animal):
    def __init__(self, name, habitat, pride):
        super().__init__(name,habitat)
        self.pride = pride
    def speak(self):
        print(f"{self.name} (Pride: {self.pride})says: ROAAR!")

dog = Dog("bruno", "home", "labrador")
parrot = Parrot("polly", "jungle", "squawk")
lion = Lion("simba", "savannah", "pride rock")

print("=== animal sound show ===/n")
for animal in [dog, parrot, lion]:
    animal.display()
    animal.speak()
    print()
    