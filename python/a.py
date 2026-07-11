"""
1) Add the project title and topics.
   a) Label the program as "Notes Cleaner".
   b) Mention topics like `read(n)`, `readlines()`, filtering lines, and copying odd lines.

2) Preview part of the file.
   a) Ask the user how many characters to preview.
   b) Open `class-notes.txt` in read mode.
   c) Use `read(n)` to print only that many characters.
   d) Close the file.

3) Read all lines as a list.
   a) Open `class-notes.txt` again.
   b) Use `readlines()` to store all lines in a list.
   c) Close the file.
   d) Print the total number of lines.
   e) Loop through the list and print each line with its line number.

4) Filter lines by starting word.
   a) Ask the user which starting word should be skipped.
   b) Open the file in read mode.
   c) Loop through each line in the file.
   d) Use `startswith()` to check whether the line should be skipped.
   e) Print whether each line is skipped or kept.
   f) Close the file.

5) Copy odd lines to a new file.
   a) Read all lines from `class-notes.txt`.
   b) Open `odd-lines.txt` in write mode.
   c) Use a loop starting from index 0 with step 2.
   d) Write only the odd-numbered lines into the new file.
   e) Close the output file.

6) Print the final confirmation.
   a) Show that odd lines were saved to `odd-lines.txt`.
"""