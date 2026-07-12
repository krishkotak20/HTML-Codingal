with open('maths-notes.txt', 'r') as f:
    for line in f:
        words = line.split()
        print(len(words),   'words ->', line.strip())