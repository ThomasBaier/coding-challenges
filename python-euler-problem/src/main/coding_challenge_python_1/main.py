import time


def rule(number):
    if (number % 2 == 0):  # even
        number = number / 2
    else:
        number = 3 * number + 1
    return int(number)


def chain(startAt):
    currNum = startAt
    currChain = [currNum]
    while currNum != 1:
        currNum = rule(currNum)
        currChain.append(currNum)
    return currChain


def longestChain():
    currLongestChain = []
    for i in range(1, 1000000):
        currChain = chain(i)
        if len(currLongestChain) < len(currChain):
            currLongestChain = currChain
            print(str(currLongestChain) + " len: " + str(len(currLongestChain)) + " i: " + str(i) + "\n")


def compare():
    start = time.time()
    longestChain()
    elapsed = (time.time() - start)
    print("time: " + str(elapsed))


if __name__ == "__main__":

    sequence = [13, 40, 20, 10, 5, 16, 8, 4, 2]
    for number in sequence:
        print("In: " + str(number) + " out: " + str(rule(number)))
    # print(chain(13))
    # longestChain()
    compare()
