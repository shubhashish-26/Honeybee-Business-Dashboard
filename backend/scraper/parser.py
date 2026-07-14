from bs4 import BeautifulSoup


def parse_businesses(html):

    soup = BeautifulSoup(html, "html.parser")

    print("=" * 60)

    print("Checking HTML Structure")

    print("=" * 60)

    # Find all cards
    cards = soup.find_all("div", class_="resultbox")

    print("Cards Found :", len(cards))

    return []