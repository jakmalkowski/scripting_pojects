## What it does
The script scrapes the amazon most-wished items in a selected category and outputs their titles/prices to a file.

## How to run:
- Install ruby 2.6+
- Check installed gems:

  ```sh
  gem list
  ```
- Ensure the following gems are installed :
    - nokogiri
    - open-uri
- Run scrape_amazon_category.rb, taking 2 params:
    - Amazon category url -> defaults to electronics
    - output file -> defaults to output.txt in the script folder