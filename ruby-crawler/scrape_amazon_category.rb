require 'nokogiri'
require 'open-uri'

def scrape_amazon_category(category_url, file_path)
  begin
    html = URI.open(category_url)
    doc = Nokogiri::HTML(html)

    File.open(file_path, 'w') do |file|
      product_grid = doc.css('div#gridItemRoot')

      product_grid.each_with_index do |product, index|
        file.puts "Product ##{index + 1}"
        title = product.css('div[class*="p13n-sc-css-line-clamp"]').text.strip
        if title.empty?
          file.puts "Title: not found"
          next
        end
        file.puts "Title: #{title}"

        price_container = product.css('span.p13n-sc-price')
        prices = price_container.map(&:text).join(' - ') 

        if prices.empty?
          file.puts "Price: Not found "
        else
          file.puts "Price: #{prices} ✅"
        end
        file.puts "-" * 40
      end
    end
  rescue OpenURI::HTTPError => e
    puts "Error accessing the URL: #{e.message}"
  rescue => e
    puts "An error occurred: #{e.message}"
  end
end

category_url = ARGV[0] || 'https://www.amazon.pl/gp/most-wished-for/electronics/'
file_path = ARGV[1] || 'output.txt'

scrape_amazon_category(category_url, file_path)

