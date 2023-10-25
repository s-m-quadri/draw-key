import math


def main():
    # Registration
    # Sign: 1: #1 0,-27,-29,-26,-24,-50,-20,64,17,16,22,30,26,-348,16,0
    # Sign: 2: #1 0,354,-16,-26,-27,-16,-50,-35,18,43,55,26,27,-343,41,0
    # Sign: 3: #1 0,-42,-19,-26,-47,-32,43,40,36,45,-339,0
    sn = []
    sn.append([0, -27, -29, -26, -24, -50, -20, 64, 17, 16, 22, 30, 26, -348, 16, 0])
    sn.append([0, 354, -16, -26, -27, -16, -50, -35, 18, 43, 55, 26, 27, -343, 41, 0])
    sn.append([0, -42, -19, -26, -47, -32, 43, 40, 36, 45, -339, 0])
    template = getTemplate(sn)
    print("Got Template:", template)

    # Testing
    # Sign: 4: #1 0,-47,-19,-39,-38,-33,19,26,52,37,22,17,-342,17,0
    test_vec = [0, -47, -19, -39, -38, -33, 19, 26, 52, 37, 22, 17, -342, 17, 0]
    x = Match(template["vector"], test_vec, template["length_min"]).res_cost
    if template["length_min"] <= len(test_vec) <= template["length_max"]:
        if template["cost_min"] <= x <= template["cost_max"]:
            print("Valid Signature!")
        else:
            print("Invalid cost!")
    else:
        print("Invalid length!")


def get_cost(vec1, vec2):
    if len(vec1) != len(vec2) or not len(vec1) > 0:
        raise ValueError("Invalid length of vector to calculate cost.")

    cost = 0
    for i in range(len(vec1)):
        cost += abs(vec1[i] - vec2[i])
    return cost


def get_mean(data_points):
    return round(sum(data_points) / len(data_points))


def get_variance(data_points):
    mean = get_mean(data_points)
    variance = 0
    for point in data_points:
        variance += (point - mean) ** 2
    return round(variance / len(data_points))


def get_std_deviation(data_points):
    return round(math.sqrt(get_variance(data_points)))


class Match:
    def __init__(self, v1, v2, target) -> None:
        self.v1 = v1
        self.v2 = v2
        self.target = target
        self.res_cost = float("inf")
        self.res_match = []
        self.explored_vec = []
        self.calculate_best_match(self.v1, self.v2)

    def calculate_best_match(self, vec1, vec2, p1=0, p2=0):
        # print(vec1, p1, vec2, p2, self.res_match, self.res_cost)
        if (vec1, vec2, p1, p2) in self.explored_vec:
            return
        else:
            self.explored_vec.append((vec1, vec2, p1, p2))

        if p1 == p2 == self.target - 1:
            cur_cost = get_cost(vec1[: p1 + 1], vec2[: p2 + 1])
            if cur_cost < self.res_cost:
                self.res_cost = cur_cost
                self.res_match = (vec1[: p1 + 1], vec2[: p2 + 1])
                # print(self.res_cost, self.res_match)

        # Consider to take from first vector
        if p1 + 1 < self.target:
            self.calculate_best_match(vec1, vec2, p1 + 1, p2)

        if len(vec1) > self.target:
            self.calculate_best_match(vec1[1:], vec2, p1, p2)

        # Consider to take from second vector
        if p2 + 1 < self.target:
            self.calculate_best_match(vec1, vec2, p1, p2 + 1)

        if len(vec2) > self.target:
            self.calculate_best_match(vec1, vec2[1:], p1, p2)

        return


def getTemplate(ref_signs: list(list())):
    # Length tolerance calculation
    ln_ref_signs = [len(sign) for sign in ref_signs]
    mean = get_mean(ln_ref_signs)
    std_deviation = get_std_deviation(ln_ref_signs)

    min_ln = min(ln_ref_signs) - std_deviation
    max_ln = max(ln_ref_signs) + std_deviation

    res_vec = ref_signs[0]
    for i in range(1, len(ref_signs)):
        next_vec = ref_signs[i]
        v1, v2 = Match(res_vec, next_vec, min_ln).res_match
        res_vec = [round((v1[k] + v2[k]) / 2) for k in range(min_ln)]

    costs = [Match(x, res_vec, min_ln).res_cost for x in ref_signs]
    mean = get_mean(costs)
    std_deviation = get_variance(costs)
    min_cost = mean - std_deviation
    max_cost = mean + std_deviation

    return {
        "length_min": min_ln,
        "length_max": max_ln,
        "cost_min": min_cost,
        "cost_max": max_cost,
        "vector": res_vec,
    }


if __name__ == "__main__":
    main()

# def getBestMatch(vec1, vec2, shrink):
#     print(vec1, vec2)
#     connections = []
#     for i1, v1 in enumerate(vec1):
#         for i2, v2 in enumerate(vec2):
#             connections.append({"index1": i1, "value1":v1, "index2":i2, "value2": v2, "cost": abs(v1-v2)})

#     connections.sort(key= lambda x: x["cost"], reverse=True)

#     print(f"{connections=}", end="\n\n")

#     new_connections = []
#     while connections:
#         arc = connections[0]
#         if not isSignificant(connections, arc["index1"], arc["index2"], shrink):
#             connections.remove(arc)
#             continue

#         new_connections.append(arc)
#         print ("++ Add ", arc)

#         i1 = arc["index1"]
#         i2 = arc["index2"]
#         for rm_arc in connections[:]:
#             if rm_arc["index1"] == i1 or rm_arc["index2"] == i2:
#                 connections.remove(rm_arc)
#                 print ("-- Remove ", rm_arc)

#     for arc in new_connections:
#         print(f"{arc=}", end="\n\n")

#     # print(isSignificant(connections, connections[0]["index1"], connections[0]["index2"], shrink))

# def isSignificant(connections, i1, i2, shrink):
#     count_i1 = 0
#     count_i2 = 0
#     total_cost = 0
#     for arc in connections:
#         if arc["index1"] == i1:
#             count_i1 += 1
#         if arc["index2"] == i2:
#             count_i2 += 1
#     print(f"{count_i1=}, {count_i2=}")
#     if count_i1 <= shrink or count_i2 <= shrink:
#         return True


# def getBestMatchV2(vec1, vec2, ln_final, final_vec = [], cost = 0):
#     print("call ",vec1, vec2, final_vec, "cost: ", cost)

#     if len(final_vec) == ln_final:
#         return final_vec, cost

#     if len(vec1) == 0 and len(vec2) == 0:
#         return None

#     # print(getCost(vec1, vec2))

#     results = []

#     # Consider to take from first vector
#     if len(vec1) >= 1:
#         results.append(getBestMatchV2(vec1[1:], vec2[:], ln_final, final_vec + [vec1[0]], cost + abs(vec1[0] - 0)))

#     # Consider to take from second vector
#     if len(vec2) >= 1:
#         results.append(getBestMatchV2(vec1[:], vec2[1:], ln_final, final_vec + [vec2[0]], cost + abs(0 - vec2[0])))

#     # Consider to take from both vector
#     # Consider to just ignore
#     if len(vec1) >= 1 and len(vec2) >= 1:
#         results.append(getBestMatchV2(vec1[1:], vec2[1:], ln_final, final_vec + [round((vec1[0] + vec2[0])/2)], cost + abs(vec1[0] - vec2[0])))
#         results.append(getBestMatchV2(vec1[1:], vec2[1:], ln_final, final_vec, cost + 0))


#     possible = []
#     for match_vec in results:
#         if match_vec:
#             possible.append(match_vec)

#     print(possible)
#     possible.sort(key=lambda x: x[1])
#     print(f"{possible[0]=}")

#     return possible[0]


# def getBestMatch(vec1, vec2, ln_final, f1=[], f2=[]):
#     # print("call ", vec1, vec2, f1, f2)
#     global known_min

#     if len(f1) == len(f2) == ln_final:
#         if getCost(f1, f2) >= known_min:
#             return None
#         return f1, f2

#     if len(vec1) == 0 and len(vec2) == 0:
#         return None

#     if len(f1) > ln_final or len(f2) > ln_final:
#         return None

#     if len(vec1) + len(f1) < ln_final and len(vec2) + len(f2) < ln_final:
#         return None

#     results = []

#     # Consider to take from first vector
#     if len(vec1) >= 1 and len(f1) < ln_final:
#         results.append(getBestMatch(vec1[1:], vec2, ln_final, f1 + [vec1[0]], f2))
#         results.append(getBestMatch(vec1[1:], vec2, ln_final, f1, f2))

#     # Consider to take from second vector
#     if len(vec2) >= 1 and len(f2) < ln_final:
#         results.append(getBestMatch(vec1, vec2[1:], ln_final, f1, f2 + [vec2[0]]))
#         results.append(getBestMatch(vec1, vec2[1:], ln_final, f1, f2))

#     possible = []
#     for match_vec in results:
#         if match_vec:
#             possible.append(match_vec)

#     # print(f"{possible=}")
#     # print(f"{possible[0][:2]=}")
#     # possible.sort(key=lambda x: getCost(x[:2]))

#     # print(f"{possible[0]=}")
#     if possible:
#         if getCost(*possible[0]) < known_min:
#             known_min = getCost(*possible[0])
#             global known_best_match
#             known_best_match = possible[0]
#             # return possible[0]

#     # return possible[0] if possible else None
#     return known_best_match


# def getBestMatch(vec1, vec2, target, p1=0, p2=0):
#     # print("call ", vec1, vec2, f1, f2)
#     global known_min

#     if len(vec1) == len(vec2) == target:
#         if getCost(vec1, vec2) >= known_min:
#             return None
#         return vec1, vec2

#     if len(vec1) < target or len(vec2) < target:
#         return None

#     results = []

#     # Consider to take from first vector
#     if p1 <= target - 2:
#         results.append(getBestMatch(vec1, vec2, target, p1 + 1, p2))

#     if len(vec1) >= 1:
#         results.append(getBestMatch(vec1[1:], vec2, target, p1, p2))

#     # Consider to take from second vector
#     if p2 <= target - 2:
#         results.append(getBestMatch(vec1, vec2, target, p1, p2 + 1))

#     if len(vec2) >= 1:
#         results.append(getBestMatch(vec1, vec2[1:], target, p1, p2))

#     if possible := [x for x in results if x]:
#         # print(f"{possible=}")
#         # print(f"{possible[0][:2]=}")
#         # possible.sort(key=lambda x: getCost(x[:2]))

#         # print(f"{possible[0]=}")
#         if getCost(*possible[0]) < known_min:
#             known_min = getCost(*possible[0])
#             global known_best_match
#             known_best_match = possible[0]
#             # return possible[0]

#     # return possible[0] if possible else None
#     return known_best_match
