class Cricket:
    def info(self):
        print("cricket score info")

    def play(self):
        print("rohit scores a six")


class Football:
    def info(self):
        print("football score info")

    def play(self):
        print("krish scores a goal")


c = Cricket()
f = Football()
c.info()
f.info()
c.play()
f.play()