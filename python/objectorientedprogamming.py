class student:
    grade = 10
    name = "penguin"

    def introduction(self):
        print("hi im a student")

    def details(self):
        print("my name is", self.name)
        print("i study in grade", self.grade)

ob = student()
ob.introduction()
ob.details()


