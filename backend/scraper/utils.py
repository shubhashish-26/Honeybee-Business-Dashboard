import pandas as pd


def clean_text(text):
    if text:
        return " ".join(text.split())
    return ""


def remove_empty_rows(data):
    cleaned = []

    for row in data:
        if any(value.strip() for value in row.values()):
            cleaned.append(row)

    return cleaned


def save_to_csv(data, filename):

    data = remove_empty_rows(data)

    df = pd.DataFrame(data)

    df.to_csv(filename, index=False)

    print(f"\nSaved {len(df)} records.")