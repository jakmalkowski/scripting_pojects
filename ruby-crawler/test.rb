require 'nokogiri'
require 'open-uri'

def scrape_amazon_category(category_url)
  begin
    # Fetch and parse the HTML document
    # div.p13n-desktop-grid
    html = URI.open(category_url)
    doc = Nokogiri::HTML(html)

    # Extract product details
    products = doc.css('._cDEzb_grid-row_3Cywl')
    products.each do |product|
      # Extract product title
      title = product.css('_cDEzb_p13n-sc-css-line-clamp-3_g3dy1')
      puts title


      # Print the extracted details
      puts "Title: #{title}"
      puts "-" * 40
    end
  rescue OpenURI::HTTPError => e
    puts "Error accessing the URL: #{e.message}"
  rescue => e
    puts "An error occurred: #{e.message}"
  end
end

# Example usage
category_url = 'https://www.amazon.pl/gp/most-wished-for/electronics/' # Example category URL
scrape_amazon_category(category_url)

