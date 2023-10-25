echo Running Algorithms

echo '=====> Step 1/3 Installing Requrements...'
# python3 -m pip install -r requirements.txt > _temp

echo '=====> Step 2/3 Checking Types...'
python3 -m mypy dk_algorithms.py

echo '=====> Step 3/3 Running Tests...'
python3 -m pytest test_dk_algorithms.py

echo '=====> Now, Running Program...'
python3 dk_algorithms.py