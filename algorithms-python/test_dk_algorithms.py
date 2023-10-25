from dk_algorithms import *
import pytest


def test_wrong_cost_cal():
    with pytest.raises(ValueError):
        get_cost([1, 1], [1, 1, 1])
    with pytest.raises(ValueError):
        get_cost([], [1])
    with pytest.raises(ValueError):
        get_cost([1], [])
    with pytest.raises(ValueError):
        get_cost([], [])


def test_correct_cost_cal():
    assert get_cost([3, 2, 2], [3, 2, 1]) == 1
    assert get_cost([5], [4]) == 1


def test_variance():
    assert get_variance([2, 3, 4]) == round(0.66666667)
    assert get_variance([0, 9, 28]) == round(136.22222)
    assert get_variance([0, 0, 999]) == round(221778)


def test_cycle_mean_var_dev_sample_1():
    sample = [-348, -50, -29, -27, -26, -24, -20, 0, 0, 16, 16, 17, 22, 26, 30, 64]
    assert get_mean(sample) == round(-20.8125)
    assert get_variance(sample) == round(7928.2773)
    assert get_std_deviation(sample) == round(89.040875)


def test_cycle_mean_var_dev_sample_2():
    sample = [0, 354, -16, -26, -27, -16, -50, -35, 18, 43, 55, 26, 27, -343, 41, 0]
    assert get_mean(sample) == round(3.1875)
    assert get_variance(sample) == round(16045.527)
    assert get_std_deviation(sample) == round(126.67094)


def test_cycle_mean_var_dev_sample_3():
    sample = [0, -42, -19, -26, -47, -32, 43, 40, 36, 45, -339, 0]
    assert get_mean(sample) == round(-28.416667)
    assert get_variance(sample) == round(9836.2431)
    assert get_std_deviation(sample) == round(99.177836)


def test_match_basic():
    assert Match([1, 1], [1, 1], 2).res_match == ([1, 1], [1, 1])
    assert Match([2, 1], [1, 2], 2).res_match == ([2, 1], [1, 2])


def test_match_one_one_left():
    assert Match([1, 1], [88, 1, 1], 2).res_match == ([1, 1], [1, 1])
    assert Match([1, 1], [88, 88, 1, 1], 2).res_match == ([1, 1], [1, 1])
    assert Match([1, 1], [88, 88, 88, 1, 1], 2).res_match == ([1, 1], [1, 1])


def test_match_one_one_right():
    assert Match([1, 1], [1, 1, 88], 2).res_match == ([1, 1], [1, 1])
    assert Match([1, 1], [1, 1, 88, 88], 2).res_match == ([1, 1], [1, 1])
    assert Match([1, 1], [1, 1, 88, 88, 88], 2).res_match == ([1, 1], [1, 1])


def test_match_one_nine_center():
    assert Match([1, 1], [10, 1, 9, 10], 2).res_match == ([1, 1], [1, 9])
    assert Match([1, 1], [10, 10, 1, 9, 10, 10], 2).res_match == ([1, 1], [1, 9])


def test_match_one_nine_left():
    assert Match([1, 1], [10, 1, 9], 2).res_match == ([1, 1], [1, 9])
    assert Match([1, 1], [10, 10, 1, 9], 2).res_match == ([1, 1], [1, 9])
    assert Match([1, 1], [10, 10, 10, 1, 9], 2).res_match == ([1, 1], [1, 9])


def test_match_one_nine_right():
    assert Match([1, 1], [1, 9, 10], 2).res_match == ([1, 1], [1, 9])
    assert Match([1, 1], [1, 9, 10, 10], 2).res_match == ([1, 1], [1, 9])
    assert Match([1, 1], [1, 9, 10, 10, 10], 2).res_match == ([1, 1], [1, 9])


def test_match_one_nine_center():
    assert Match([1, 1], [10, 1, 9, 10], 2).res_match == ([1, 1], [1, 9])
    assert Match([1, 1], [10, 10, 1, 9, 10, 10], 2).res_match == ([1, 1], [1, 9])
