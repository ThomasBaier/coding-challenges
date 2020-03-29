import unittest

from coding_challenge_python_1.dummy import Dummy


class TestDummy(unittest.TestCase):

    def setUp(self):
        self.dummy_class = Dummy()
        return 0

    def test_dummy(self):
        assert self.dummy_class.return_1() is 1
