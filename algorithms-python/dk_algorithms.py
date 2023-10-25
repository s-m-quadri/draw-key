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


def get_cost(vec1: list[int], vec2: list[int]) -> int:
    """Calculates and returns the cost of two equal-length vector"""
    if len(vec1) != len(vec2) or not len(vec1) > 0:
        raise ValueError("Invalid length of vector to calculate cost.")

    cost = 0
    for i in range(len(vec1)):
        cost += abs(vec1[i] - vec2[i])
    return round(cost)


def get_mean(data_points: list[int]) -> int:
    """Get the mean for given data points"""
    return round(sum(data_points) / len(data_points))


def get_variance(data_points: list[int]) -> int:
    """Get the variance for given data points"""
    mean = get_mean(data_points)
    variance = 0
    for point in data_points:
        variance += (point - mean) ** 2
    return round(variance / len(data_points))


def get_std_deviation(data_points: list[int]) -> int:
    """Get the standard deviation for given data points"""
    return round(math.sqrt(get_variance(data_points)))


class Match:
    def __init__(self, v1: list[int], v2: list[int], target: int) -> None:
        self.target = target
        self.res_cost = 2**16
        self.res_match = list[list[int], list[int]]
        self.explored_vec = []
        self.calculate_best_match(v1, v2)

    def calculate_best_match(
        self, vec1: list[int], vec2: list[int], p1=0, p2=0
    ) -> None:
        """Shrinks both vectors, and modifies self.res... props based on the target array and cost function"""
        # Not to ignore already completed steps
        if (vec1, vec2, p1, p2) in self.explored_vec:
            return
        else:
            self.explored_vec.append((vec1, vec2, p1, p2))

        # Pointers reached at the target
        if p1 == p2 == self.target - 1:
            cur_cost = get_cost(vec1[: p1 + 1], vec2[: p2 + 1])
            if cur_cost < self.res_cost:
                self.res_cost = cur_cost
                self.res_match = (vec1[: p1 + 1], vec2[: p2 + 1])

        # Consider to take from first vector
        if p1 + 1 < self.target:
            self.calculate_best_match(vec1, vec2, p1 + 1, p2)

        # Consider to ignore from first vector
        if len(vec1) > self.target:
            self.calculate_best_match(vec1[1:], vec2, p1, p2)

        # Consider to take from second vector
        if p2 + 1 < self.target:
            self.calculate_best_match(vec1, vec2, p1, p2 + 1)

        # Consider to ignore from second vector
        if len(vec2) > self.target:
            self.calculate_best_match(vec1, vec2[1:], p1, p2)


def getTemplate(ref_signs: list[list[int]]) -> dict:
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
